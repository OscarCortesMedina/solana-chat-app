import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaChatApp } from "../target/types/solana_chat_app";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { assert } from "chai";

describe("solana-chat-app", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaChatApp as Program<SolanaChatApp>;

  const publicKey = anchor.AnchorProvider.local().wallet.publicKey;
  const [profilePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [utf8.encode("chatapp"), publicKey.toBuffer()],
    program.programId
  );
  console.log("profilePda", profilePda);

  it("Profile created!", async () => {
    // Add your test here.
    const tx = await program.methods
      .createProfile("dante")
      .accounts({
        authority: publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        profile: profilePda,
      })
      .rpc();
    //console.log("Your transaction signature", tx);
    const escrowAccount = await program.account.chatProfile.fetch(profilePda);
    console.log(escrowAccount);
    assert.equal(escrowAccount.displayName, "dante");
    assert.isTrue(escrowAccount.authority.equals(publicKey));
  });

  it("Chat create", async () => {
    const [chat] = anchor.web3.PublicKey.findProgramAddressSync(
      [utf8.encode("chat"), profilePda.toBuffer()],
      program.programId
    );
    console.log("chat", chat);
    // Add your test here.
    const tx = await program.methods
      .chat("This is a test of a chat")
      .accounts({
        //walletPubkey: publicKey,
        profile: profilePda,
        authority: publicKey,
        chat,
      })
      .rpc();
    //console.log("Your transaction signature", tx);
    const escrowAccount = await program.account.solanaChat.fetch(chat);
    //console.log("chatAccount", escrowAccount);
    assert.equal(escrowAccount.chat, "This is a test of a chat");
    assert.isTrue(escrowAccount.profilePubkey.equals(profilePda));
    assert.isTrue(escrowAccount.walletPubkey.equals(publicKey));
  });
  it("retreive all chats", async () => {
    const chats = await program.account.solanaChat.all();
    assert.isTrue(chats.length == 1);
  });
});
