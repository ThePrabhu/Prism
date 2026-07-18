from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/summary")
def summary(
    db: Session = Depends(get_db),
):
    return DashboardService.get_summary(db)


@router.get("/recent-uploads")
def recent_uploads(
    limit: int = 10,
    db: Session = Depends(get_db),
):
    return DashboardService.get_recent_uploads(
        db,
        limit,
    )


@router.get("/invoice-stats")
def invoice_stats(
    db: Session = Depends(get_db),
):
    return DashboardService.get_invoice_stats(db)


@router.get("/vendors")
def vendors(
    limit: int = 10,
    db: Session = Depends(get_db),
):
    return DashboardService.get_vendor_stats(
        db,
        limit,
    )


@router.get("/charts")
def charts(
    db: Session = Depends(get_db),
):
    return DashboardService.get_monthly_chart(db)