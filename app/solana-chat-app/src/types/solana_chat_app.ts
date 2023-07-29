export type SolanaChatApp = {
  "version": "0.1.0",
  "name": "solana_chat_app",
  "instructions": [
    {
      "name": "createProfile",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "displayName",
          "type": "string"
        }
      ],
      "returns": null
    },
    {
      "name": "chat",
      "accounts": [
        {
          "name": "chat",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "chat",
          "type": "string"
        }
      ],
      "returns": null
    }
  ],
  "accounts": [
    {
      "name": "solanaChat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "walletPubkey",
            "type": "publicKey"
          },
          {
            "name": "profilePubkey",
            "type": "publicKey"
          },
          {
            "name": "chat",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "chatProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "displayName",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: SolanaChatApp = {
  "version": "0.1.0",
  "name": "solana_chat_app",
  "instructions": [
    {
      "name": "createProfile",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "displayName",
          "type": "string"
        }
      ],
      "returns": null
    },
    {
      "name": "chat",
      "accounts": [
        {
          "name": "chat",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "chat",
          "type": "string"
        }
      ],
      "returns": null
    }
  ],
  "accounts": [
    {
      "name": "solanaChat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "walletPubkey",
            "type": "publicKey"
          },
          {
            "name": "profilePubkey",
            "type": "publicKey"
          },
          {
            "name": "chat",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "chatProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "displayName",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
