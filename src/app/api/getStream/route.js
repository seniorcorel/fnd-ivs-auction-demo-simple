import { GetStreamCommand, IvsClient } from "@aws-sdk/client-ivs";


export async function GET() {
  const client = new IvsClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  })
  const command = new GetStreamCommand({ channelArn: process.env.NEXT_PUBLIC_CHANNEL_ARN })
  const { stream } = await client.send(command)
  return Response.json(stream);
}
