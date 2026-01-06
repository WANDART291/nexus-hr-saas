import graphene
import core.schema
import payroll.schema

# 1. Combine all Queries (Read)
class Query(core.schema.Query, payroll.schema.Query, graphene.ObjectType):
    pass

# 2. Combine all Mutations (Write)
class Mutation(core.schema.Mutation, graphene.ObjectType):
    pass

# 3. Create the Master Schema
schema = graphene.Schema(query=Query, mutation=Mutation)