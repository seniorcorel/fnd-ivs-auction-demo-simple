import { IvschatClient, CreateChatTokenCommand, ChatTokenCapability } from "@aws-sdk/client-ivschat";

export async function POST(request) {
  const { username } = await request.json();

  const client = new IvschatClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY ?? '',
    },
  })
  const input = {
    roomIdentifier: process.env.NEXT_PUBLIC_CHATROOM_ID, // required
    userId: username, // required
    capabilities: [ChatTokenCapability.SEND_MESSAGE],
  };
  const command = new CreateChatTokenCommand(input);
  const createChatTokenResponse = await client.send(command);
  return Response.json(createChatTokenResponse);
}
