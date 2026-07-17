from sqlalchemy import func

from app.models.resolution_case import ResolutionCase


class ITCEngine:

    @staticmethod
    def calculate(
        db,
        workspace_id,
    ):

        blocked = (
            db.query(
                func.coalesce(
                    func.sum(
                        ResolutionCase.recoverable_amount
                    ),
                    0,
                )
            )
            .filter(
                ResolutionCase.workspace_id
                == workspace_id
            )
            .scalar()
        )

        recoverable = blocked * 0.80

        return {

            "blocked_itc": blocked,

            "recoverable_itc": recoverable,

            "cases": (
                db.query(ResolutionCase)
                .filter(
                    ResolutionCase.workspace_id
                    == workspace_id
                )
                .count()
            ),

        }