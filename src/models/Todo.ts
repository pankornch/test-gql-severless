import AWS from "aws-sdk"
import { v4 } from "uuid"

const docClient = new AWS.DynamoDB.DocumentClient()
const tableName = "TodoTable"

class Todo {
	async findAll(): Promise<ITodo[]> {
		const { Items } = await docClient.scan({ TableName: tableName }).promise()
		return Items as ITodo[]
	}

	async findById(id: string): Promise<ITodo> {
		const { Item } = await docClient
			.get({ TableName: tableName, Key: { id } })
			.promise()

		return Item as ITodo
	}

	async create(props: CreateProps): Promise<ITodo> {
		const data: ITodo = {
			id: v4(),
			title: props.title,
			completed: false,
		}

		await docClient.put({ TableName: tableName, Item: data }).promise()

		return data
	}

	async updateById(id: string, props: UpdateProps): Promise<ITodo> {
		const oldData = await this.findById(id)
		if (!oldData) {
			throw new Error("Incorrect todo id")
		}

		const newData: ITodo = {
			...oldData,
			...props,
			id,
		}

		await docClient.put({ TableName: tableName, Item: newData }).promise()

		return newData
	}

	async deleteById(id: string): Promise<void> {
		const isExist = await this.findById(id)
		if (!isExist) {
			throw new Error("Incorrect todo id")
		}

		await docClient.delete({ TableName: tableName, Key: { id } }).promise()
	}
}

interface CreateProps {
	title: string
}

interface UpdateProps {
	title?: string
	completed?: boolean
}

export interface ITodo {
	id: string
	title: string
	completed: boolean
}

export default new Todo()
