import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { getUserId } from '../utils'
import { deleteTodo, getSingleTodo } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;
    // const user_id = getUserId(event)
    const todoItem = await getSingleTodo(todoId)
    // TODO: Remove a TODO item by id

    await deleteTodo(todoItem);
    return {
      statusCode: 201,
      body: JSON.stringify({
      })
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
