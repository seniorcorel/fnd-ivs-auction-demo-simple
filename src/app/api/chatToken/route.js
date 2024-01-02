import { IvschatClient, CreateChatTokenCommand, ChatTokenCapability } from "@aws-sdk/client-ivschat";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  const { username } = await request.json();
  const userID = uuidv4()

  const client = new IvschatClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  })
  const input = {
    roomIdentifier: process.env.NEXT_PUBLIC_CHATROOM_ID, // required
    userId: userID, // required
    capabilities: [ChatTokenCapability.SEND_MESSAGE],
    attributes: {
      displayName: username,
    },
  };
  const command = new CreateChatTokenCommand(input);
  const createChatTokenResponse = await client.send(command);
  return Response.json(createChatTokenResponse);
}
