import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getUserId } from '../utils'
import { getUploadUrl } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const user_id = getUserId(event);
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const uploadUrl = await getUploadUrl(todoId, user_id);


    return {
      statusCode: 201,
      body: JSON.stringify({ uploadUrl })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
