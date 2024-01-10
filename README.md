# Tutorial: How to create an Auction app using AWS Interactive Video Service(IVS) Chat

<img src="public/chat-streamer-user-top.png" alt="Amazon IVS console Channel Arn" />

This is a tutorial sample used to demonstrate basic React usage for [IVS Low-Latency Streaming](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/what-is.html) using [Next.js](https://nextjs.org/).<br/>
Use the AWS Console to create a Channel and Chat Room. You can use this application to [Broadcast](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/broadcast.html) and [Playback](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/player.html) your stream with a [Chat Room](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/chat-sdk-js.html). <br/>


- IVS Broadcast SDK ([link](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/broadcast.html))
- IVS Player SDK ([link](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/player.html))
- IVS Chat SDK([link](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/chat-sdk-js.html))
- IVS Chat Client ([link](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ivschat/))

We are also using:

- Milligram CSS for basic CSS styling (https://milligram.io/)

## You will learn how to:

- [Run the finished code](#run-the-finished-code)

  - [Step 1. Create an IVS Channel](#step-1-create-an-ivs-channel)
  - [Step 2. Create a Chat Room](#step-2-create-a-chat-room)
  - [Step 3. Run the Code](#step-3-run-the-code)

- [Build from Scratch](#build-from-scratch)
  - [File Structure](#file-structure)
  - [Step 1. Install NextJS and add packages](#step-1-install-nextjs-and-add-packages)
  - [Step 2. Add Chat Messaging](#step-2-add-chat-messaging)
  - [Step 3. Show streaming video in Viewer Page](#step-3-show-streaming-video-in-viewer-page)
  - [Step 4. Broadcast your stream in Streamer Page](#step-4-broadcast-your-stream-in-streamer-page)
<br />


## Run the finished code

**`Prerequisites 1: A user must have an AWS Console Account.`** <br/>
- If you don't have an AWS account, [create an AWS account here](https://aws.amazon.com/free/), and [create a user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console) with [IVS permissions](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/getting-started-iam-permissions.html) or [Administrative access](https://docs.aws.amazon.com/singlesignon/latest/userguide/get-started-assign-account-access-admin-user.html).

**`Prerequisites 2: You must have Credentials set up on your computer `** <br/>

If you don't have AWS credentials setup on your local machine, first [install CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and then [add crendentials to your local machine](https://docs.aws.amazon.com/cli/latest/userguide/cli-authentication-short-term.html)

### Step 1. Create an IVS Channel

#### 1a. Create a new IVS Channel <br />