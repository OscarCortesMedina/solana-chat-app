use anchor_lang::prelude::*;

use crate::state::ChatProfile;

pub fn create_profile(ctx: Context<CreateProfile>, display_name: String) -> Result<()> {
    let profile = ChatProfile::new(display_name, ctx.accounts.authority.key());
    ctx.accounts.profile.set_inner(profile.clone());
    Ok(())
}

#[derive(Accounts)]
pub struct CreateProfile<'info> {
    #[account(
        init,
        payer = authority,
        space = ChatProfile::ACCOUNT_SPACE,
        seeds = [
            b"chatapp".as_ref(),
            authority.key().as_ref(),
        ],
        bump
    )]
    pub profile: Account<'info, ChatProfile>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
