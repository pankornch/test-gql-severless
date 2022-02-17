import { gql } from "apollo-server-lambda"

export default gql`
	type Query {
		hello: String
		todos: [Todo]
		todo(id: ID!): Todo
	}

	type Mutation {
		createTodo(title: String!): Todo!
        updateTodo(id: ID!, title: String, completed: Boolean): Todo!
        deleteTodo(id: ID!): String
	}

	type Todo {
		id: ID
		title: String
		completed: Boolean
	}
`
