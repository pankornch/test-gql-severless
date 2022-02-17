import AWS from "aws-sdk"
import Todo, { ITodo } from "../models/Todo"

export default {
	Query: {
		hello() {
			return "Hello World!"
		},
		async todos() {
			try {
				return await Todo.findAll()
			} catch (error) {
				throw new Error(error)
			}
		},
		async todo(_: any, args: { id: string }) {
			try {
				return await Todo.findById(args.id)
			} catch (error) {
				throw new Error(error)
			}
		},
	},
	Mutation: {
		async createTodo(_: any, args: { title: string }) {
			try {
				return await Todo.create({ title: args.title })
			} catch (error) {
				throw new Error(error)
			}
		},
		async updateTodo(_: any, args: Partial<ITodo>) {
			try {
				return await Todo.updateById(args.id!, args)
			} catch (error) {
				throw new Error(error)
			}
		},

		async deleteTodo(_: any, args: { id: string }) {
			try {
				await Todo.deleteById(args.id)
				return "Delete successful!"
			} catch (error) {
				throw new Error(error)
			}
		},
	},
}
