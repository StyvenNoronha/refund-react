import { Routes, Route } from "react-router";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/Dashboard";
import { AppLayout } from "../components/AppLayout";
import { Refund } from "../pages/Refund";

export function DashboardRoutes(){
    return (
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/refund/:id" element={<Refund/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}