use anchor_lang::prelude::*;

use instructions::*;

pub mod instructions;
pub mod state;

declare_id!("FVB74DqVFkroPzdtt2YxRN8SCCnvk9wUka42Tb1Apn2G");

#[program]
pub mod solana_chat_app {
    use super::*;

    // Create Profile instruction
    //
    pub fn create_profile(ctx: Context<CreateProfile>, display_name: String) -> Result<()> {
        // Calls 'create_profile' from instructions/create_profile.rs
        instructions::create_profile::create_profile(ctx, display_name)
    }

    pub fn chat(ctx: Context<CreateChat>, chat: String) -> Result<()> {
        // Calls 'create_chat' from instructions/create_chat.rs
        instructions::create_chat::create_chat(ctx, chat)
    }
}
