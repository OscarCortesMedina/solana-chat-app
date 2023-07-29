use anchor_lang::prelude::*;

#[account]
pub struct SolanaChat {
    pub wallet_pubkey: Pubkey,
    pub profile_pubkey: Pubkey,
    pub chat: String,
}

impl SolanaChat {
    pub const ACCOUNT_SPACE: usize = 8 + 32 + 32 + 4 + 40 + 1;

    pub const SEED_PREFIX: &'static str = "chat";

    pub fn new(wallet_pubkey: Pubkey, profile_pubkey: Pubkey, chat: String) -> Self {
        SolanaChat {
            wallet_pubkey,
            profile_pubkey,
            chat,
        }
    }
}
