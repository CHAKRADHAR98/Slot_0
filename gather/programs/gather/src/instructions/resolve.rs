use anchor_lang::prelude::*;

use crate::{
    admin_check,
    constant::*,
    error::GatherError,
    state::*,
    utils::{MarketOutcome, MarketStatus},
};

#[derive(Accounts)]
pub struct Resolve<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        mut,
        seeds = [GATHER_CONFIG],
        bump = gather_config.config_bump
    )]
    pub gather_config: Account<'info, GatherConfig>,

    #[account(
        mut,
        seeds = [MARKET, gather_config.key().to_bytes().as_ref(),&gather_market.market_name.as_bytes()[..gather_market.market_name.len().min(32)]],
        bump = gather_market.market_bump
    )]
    pub gather_market: Account<'info, GatherMarket>,
}

impl<'info> Resolve<'info> {
    pub fn resolve_market(&mut self, outcome: MarketOutcome) -> Result<()> {
        admin_check!(self);

        require!(
            Clock::get()?.unix_timestamp >= self.gather_market.dead_line,
            GatherError::MarketNotResolved
        );

        match self.gather_market.market_state {
            MarketStatus::Active => match outcome {
                MarketOutcome::YES => {
                    self.gather_market.market_outcome = MarketOutcome::YES;
                    self.gather_market.market_state = MarketStatus::Resolved;
                }
                MarketOutcome::NO => {
                    self.gather_market.market_outcome = MarketOutcome::YES;
                    self.gather_market.market_state = MarketStatus::Resolved;
                }
                MarketOutcome::NotResolved => {}
            },
            MarketStatus::Resolved => {
                return err!(GatherError::MarketGotResolved);
            }
        }

        Ok(())
    }
}
