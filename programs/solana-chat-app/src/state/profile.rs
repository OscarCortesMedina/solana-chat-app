use anchor_lang::prelude::*;

#[account]
pub struct ChatProfile {
    pub display_name: String,
    pub authority: Pubkey,
}

impl ChatProfile {
    pub const ACCOUNT_SPACE: usize = 8 + 40 + 40 + 4 + 32 + 1;

    pub const SEED_PREFIX: &'static str = "profile";

    pub fn new(display_name: String, authority: Pubkey) -> Self {
        ChatProfile {
            display_name,
            authority,
        }
    }
}
