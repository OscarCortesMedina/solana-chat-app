use anchor_lang::prelude::*;

use crate::state::ChatProfile;
use crate::state::SolanaChat;

pub fn create_chat(ctx: Context<CreateChat>, chat: String) -> Result<()> {
    let profile = &mut ctx.accounts.profile;
    let chat = SolanaChat::new(ctx.accounts.authority.key(), profile.key(), chat);
    ctx.accounts.chat.set_inner(chat.clone());

    Ok(())
}

#[derive(Accounts)]
pub struct CreateChat<'info> {
    #[account(
        init,
        payer = authority,
        space = SolanaChat::ACCOUNT_SPACE,
        seeds = [
            b"chat".as_ref(),
            profile.key().as_ref()
        ],
        bump
    )]
    pub chat: Account<'info, SolanaChat>,
    #[account(
        mut,
        has_one = authority,
    )]
    pub profile: Account<'info, ChatProfile>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
