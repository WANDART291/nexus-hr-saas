import graphene
import graphql_jwt
import core.schema
import leave.schema
import payroll.schema
import performance.schema
import audit.schema

class Query(
    core.schema.Query,
    leave.schema.Query,
    payroll.schema.Query,
    performance.schema.Query,
    audit.schema.Query,
    graphene.ObjectType
):
    pass

class Mutation(
    core.schema.Mutation, 
    leave.schema.Mutation, 
    payroll.schema.Mutation,
    performance.schema.Mutation, # <--- THIS IS THE NEW LINE
    graphene.ObjectType
):
    # ===========================================
    # 🔐 AUTHENTICATION MUTATIONS (Standard JWT)
    # ===========================================
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)