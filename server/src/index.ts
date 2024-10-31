import express from "express";
import datesRoutes from "./routes/date.routes";
import patientRoutes from "./routes/patient.routes";
import procedureRoutes from "./routes/procedure.routes";
import supplyRoutes from "./routes/supply.routes";
import treatmeantRoutes from "./routes/treatmeant.routes";
import procedureDateRoutes from "./routes/procedureDate.routes";
import treatmeantSupplyRoutes from "./routes/treameantSupply.routes";
import sessionRoutes from "./routes/session.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/dates", datesRoutes);
app.use("/api/procedure", procedureRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/supply", supplyRoutes);
app.use("/api/treatmeant", treatmeantRoutes);
app.use("/api/procedure-date/", procedureDateRoutes);
app.use("/api/treatmeant-supply/", treatmeantSupplyRoutes);
app.use("/api/session", sessionRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
