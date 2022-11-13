import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils';
import { getAllTodos } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const user_id = getUserId(event)
    const items = await getAllTodos(user_id)

    return {
      statusCode: 201,
      body: JSON.stringify({ items })
    }

  })

handler.use(
  cors({
    credentials: true
  })
)
