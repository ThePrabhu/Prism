from pydantic import BaseModel


class ITCSummary(BaseModel):

    blocked_itc: float

    recoverable_itc: float

    cases: int