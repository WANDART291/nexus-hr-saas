import graphene
from graphene_django import DjangoObjectType
from .models import PerformanceGoal, PerformanceReview
from core.models import EmployeeProfile

# ===========================================
# 1. TYPES
# ===========================================

class PerformanceGoalType(DjangoObjectType):
    class Meta:
        model = PerformanceGoal
        fields = "__all__"

class PerformanceReviewType(DjangoObjectType):
    class Meta:
        model = PerformanceReview
        fields = "__all__"

# ===========================================
# 2. QUERY
# ===========================================

class Query(graphene.ObjectType):
    my_goals = graphene.List(PerformanceGoalType)
    my_reviews = graphene.List(PerformanceReviewType)

    def resolve_my_goals(self, info):
        user = info.context.user
        if user.is_anonymous:
            return PerformanceGoal.objects.none()
        return PerformanceGoal.objects.filter(employee__user=user)

    def resolve_my_reviews(self, info):
        user = info.context.user
        if user.is_anonymous:
            return PerformanceReview.objects.none()
        # Return reviews where I am the employee being reviewed
        return PerformanceReview.objects.filter(employee__user=user)

# ===========================================
# 3. MUTATIONS
# ===========================================

class CreateGoal(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        due_date = graphene.Date(required=True)

    goal = graphene.Field(PerformanceGoalType)

    def mutate(self, info, title, description, due_date):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not authorized")
        
        emp = EmployeeProfile.objects.get(user=user)
        
        goal = PerformanceGoal.objects.create(
            employee=emp,
            title=title,
            description=description,
            due_date=due_date
        )
        return CreateGoal(goal=goal)

class CreateReview(graphene.Mutation):
    class Arguments:
        employee_id = graphene.ID(required=True)
        score = graphene.Int(required=True)
        feedback = graphene.String(required=True)
        period = graphene.String(required=True)

    review = graphene.Field(PerformanceReviewType)

    def mutate(self, info, employee_id, score, feedback, period):
        reviewer_user = info.context.user
        if reviewer_user.is_anonymous:
            raise Exception("Not authorized")

        reviewer_profile = EmployeeProfile.objects.get(user=reviewer_user)
        target_employee = EmployeeProfile.objects.get(pk=employee_id)

        # Create the review
        review = PerformanceReview.objects.create(
            employee=target_employee,
            reviewer=reviewer_profile,
            score=score,
            feedback=feedback,
            review_period=period
        )
        return CreateReview(review=review)

class Mutation(graphene.ObjectType):
    create_goal = CreateGoal.Field()
    create_review = CreateReview.Field()