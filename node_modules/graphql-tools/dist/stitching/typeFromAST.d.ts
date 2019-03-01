import { DefinitionNode, GraphQLInputObjectType, GraphQLInterfaceType, GraphQLNamedType, GraphQLObjectType } from 'graphql';
export declare type GetType = (name: string, type: 'object' | 'interface' | 'input') => GraphQLObjectType | GraphQLInputObjectType | GraphQLInterfaceType;
export default function typeFromAST(node: DefinitionNode): GraphQLNamedType | null;
