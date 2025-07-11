from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pathlib import Path

app = FastAPI(title="Processing API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Update paths for Vercel deployment
BASE_DIR = Path(__file__).resolve().parent.parent.parent
SECURITY_PATH = BASE_DIR / "data/wayne_security_data.csv"
HR_PATH = BASE_DIR / "data/wayne_hr_analytics.csv"
FINANCE_PATH = BASE_DIR / "data/wayne_financial_data.csv"
RD_PATH = BASE_DIR / "data/wayne_rd_portfolio.csv"
SUPPLY_CHAIN_PATH = BASE_DIR / "data/wayne_supply_chain.csv"


@app.get("/api/incidents")
def get_monthly_incidents():
    try:
        if not SECURITY_PATH.exists():
            return {"error": "CSV file not found"}

        df = pd.read_csv(SECURITY_PATH)
        df = df.dropna(subset=["Date", "Security_Incidents"])
        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
        df = df.dropna(subset=["Date"])
        df["month"] = df["Date"].dt.strftime("%b %Y")

        res = (
            df.groupby("month")["Security_Incidents"]
            .sum()
            .reset_index()
            .rename(columns={"Security_Incidents": "totalIncidents"})
        )

        res["sort_key"] = pd.to_datetime(res["month"], format="%b %Y")
        res = res.sort_values("sort_key").drop(columns="sort_key")

        return res.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/hr-metrics")
def get_hr_metrics():
    try:
        if not HR_PATH.exists():
            return {"error": "CSV file not found"}

        df = pd.read_csv(HR_PATH)
        df = df.dropna(
            subset=[
                "Department",
                "Employee_Level",
                "Retention_Rate_Pct",
                "Employee_Satisfaction_Score",
            ]
        )

        grouped = (
            df.groupby(["Department", "Employee_Level"])
            .agg({"Retention_Rate_Pct": "mean", "Employee_Satisfaction_Score": "mean"})
            .reset_index()
            .rename(
                columns={
                    "Department": "department",
                    "Employee_Level": "employee_level",
                    "Retention_Rate_Pct": "retention_rate",
                    "Employee_Satisfaction_Score": "satisfaction_score",
                }
            )
        )

        return grouped.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/revenue")
def get_revenue_data():
    if not FINANCE_PATH.exists():
        return {"error": "CSV file not found"}

    try:
        df = pd.read_csv(FINANCE_PATH)
        df = df[["Quarter", "Year", "Revenue_M"]].dropna()
        df["Quarter"] = df["Quarter"].astype(str).str.strip()
        df["Year"] = df["Year"].astype(int)
        df["Revenue_M"] = pd.to_numeric(df["Revenue_M"], errors="coerce")
        df = df.dropna(subset=["Revenue_M"])

        quarter_order = {"Q1": 1, "Q2": 2, "Q3": 3, "Q4": 4}
        df["Quarter_Num"] = df["Quarter"].map(quarter_order)

        grouped = df.groupby(["Year", "Quarter", "Quarter_Num"], as_index=False).agg(
            {"Revenue_M": "sum"}
        )

        grouped["period"] = grouped["Quarter"] + " " + grouped["Year"].astype(str)
        grouped = grouped.sort_values(["Year", "Quarter_Num"])

        return (
            grouped[["period", "Revenue_M"]]
            .rename(columns={"Revenue_M": "revenue"})
            .to_dict(orient="records")
        )
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/rd-status")
def get_rd_status():
    try:
        if not RD_PATH.exists():
            return {"error": "CSV file not found"}

        df = pd.read_csv(RD_PATH)
        df = df[["Division", "Status"]].dropna()
        df["Division"] = df["Division"].str.strip()
        df["Status"] = df["Status"].str.strip().str.capitalize()

        valid_statuses = {"Active", "Completed", "Paused"}
        df = df[df["Status"].isin(valid_statuses)]

        grouped = (
            df.groupby(["Division", "Status"])
            .size()
            .unstack(fill_value=0)
            .reset_index()
        )

        for col in ["Active", "Completed", "Paused"]:
            if col not in grouped.columns:
                grouped[col] = 0

        return grouped.rename(columns={"Division": "division"}).to_dict(
            orient="records"
        )
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/production-data")
def get_production_data():
    if not SUPPLY_CHAIN_PATH.exists():
        return {"error": "CSV file not found"}

    try:
        df = pd.read_csv(SUPPLY_CHAIN_PATH)
        df = df.dropna(subset=["Product_Line", "Monthly_Production_Volume"])
        df["Monthly_Production_Volume"] = pd.to_numeric(
            df["Monthly_Production_Volume"], errors="coerce"
        )
        df = df.dropna(subset=["Monthly_Production_Volume"])

        grouped = (
            df.groupby("Product_Line")["Monthly_Production_Volume"]
            .sum()
            .reset_index()
            .sort_values("Monthly_Production_Volume", ascending=False)
            .rename(
                columns={
                    "Product_Line": "product_line",
                    "Monthly_Production_Volume": "production",
                }
            )
        )

        return grouped.to_dict(orient="records")

    except Exception as e:
        return {"error": str(e)}
