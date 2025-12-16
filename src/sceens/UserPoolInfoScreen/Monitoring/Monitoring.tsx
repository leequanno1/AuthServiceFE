import React, { useEffect, useState } from "react";
import "./Monitoring.css";
import TimeAreaChart from "../../../components/TimeChart/TimeChart";
import { ChartPoint } from "../../../entities/chart-point";
import Card from "../../../components/Card/Card";
import { api } from "../../../services/api-service";
import { useParams } from "react-router-dom";
import { toastService } from "../../../services/toast-service";
import { UserPoolPolicies } from "../../../entities/user-pool-policies";
import poolPoliciesService from "../../../services/pool-policies-service";
import userPoolPoliciesStore from "../../../store/user-pool-policies.store";
import accountService from "../../../services/account-service";

const Monitoring: React.FC = () => {
  const [loginLogs, setLoginLogs] = useState<ChartPoint[]>([]);
  const [loginFailLogs, setLoginFailLogs] = useState<ChartPoint[]>([]);
  const [signupLogs, setSignupLogs] = useState<ChartPoint[]>([]);
  const [signupFailLogs, setSignupFailLogs] = useState<ChartPoint[]>([]);
  const [verifyLogs, setVerifyLogs] = useState<ChartPoint[]>([]);
  const [verifyFailLogs, setVerifyFailLogs] = useState<ChartPoint[]>([]);
  const [poolPolicies, setPoolPolicies] =
    React.useState<UserPoolPolicies | null>(null);
  const { poolID } = useParams();
  const isRoot = accountService.isRoot();

  const getMiliSeconds = (date: Date) => {
    return date.getTime();
  };

  const getNearedDate = () => {
    const now = new Date();
    const currentMilliseconds = now.getTime();

    const fiveSecondsInMs = 30 * 1000;

    const roundedMilliseconds =
      Math.floor(currentMilliseconds / fiveSecondsInMs) * fiveSecondsInMs;

    const nearestDate = new Date(roundedMilliseconds);

    return nearestDate;
  };

  const getDateBefore = (date: Date, beforeSec: number) => {
    const newDate = new Date(date);
    newDate.setTime(newDate.getTime() - beforeSec * 1000);
    return newDate;
  };

  const fetchChartDates = async (
    url: string,
    poolID: string,
    timeFrom: number,
    timeTo: number
  ) => {
    const response = await api.get(`${url}/${poolID}/${timeFrom}/${timeTo}`);
    return response.data.result.logRecords as ChartPoint[];
  };

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    let isCancel = false;
    const handleLoadChartDatas = async () => {
      // load pool policies
      if (!isRoot) {
        await poolPoliciesService.refreshPoolPolicies();
        const tempPolicies = userPoolPoliciesStore
          .getState()
          .userPoolPoliciesMapByPoolID.get(poolID ?? "");
        if (tempPolicies && !!tempPolicies.canManage) {
          setPoolPolicies(tempPolicies);
        } else {
          return;
        }
      }

      let timeTo = getNearedDate();
      let timeFrom = getDateBefore(timeTo, 3600);
      let tmpLoginLog: ChartPoint[] = [];
      let tmpLoginFLog: ChartPoint[] = [];
      let tmpSignupLog: ChartPoint[] = [];
      let tmpSignupFLog: ChartPoint[] = [];
      let tmpVerifyLog: ChartPoint[] = [];
      let tmpVeriftFLog: ChartPoint[] = [];
      try {
        do {
          tmpLoginLog = [
            ...tmpLoginLog,
            ...(await fetchChartDates(
              "/user-pool/login-log",
              poolID ?? "",
              getMiliSeconds(timeFrom),
              getMiliSeconds(timeTo)
            )),
          ];
          tmpLoginFLog = [
            ...tmpLoginFLog,
            ...(await fetchChartDates(
              "/user-pool/login-fail-log",
              poolID ?? "",
              getMiliSeconds(timeFrom),
              getMiliSeconds(timeTo)
            )),
          ];
          tmpSignupLog = [
            ...tmpSignupLog,
            ...(await fetchChartDates(
              "/user-pool/signup-log",
              poolID ?? "",
              getMiliSeconds(timeFrom),
              getMiliSeconds(timeTo)
            )),
          ];
          tmpSignupFLog = [
            ...tmpSignupFLog,
            ...(await fetchChartDates(
              "/user-pool/signup-fail-log",
              poolID ?? "",
              getMiliSeconds(timeFrom),
              getMiliSeconds(timeTo)
            )),
          ];
          tmpVerifyLog = [
            ...tmpVerifyLog,
            ...(await fetchChartDates(
              "/user-pool/verify-log",
              poolID ?? "",
              getMiliSeconds(timeFrom),
              getMiliSeconds(timeTo)
            )),
          ];
          tmpVeriftFLog = [
            ...tmpVeriftFLog,
            ...(await fetchChartDates(
              "/user-pool/verify-fail-log",
              poolID ?? "",
              getMiliSeconds(timeFrom),
              getMiliSeconds(timeTo)
            )),
          ];

          setLoginLogs(tmpLoginLog);
          setLoginFailLogs(tmpLoginFLog);
          setSignupLogs(tmpSignupLog);
          setSignupFailLogs(tmpSignupFLog);
          setVerifyLogs(tmpVerifyLog);
          setVerifyFailLogs(tmpVeriftFLog);
          // sleep 30s
          await sleep(30000);
          timeTo = getNearedDate();
          timeFrom = getDateBefore(timeTo, 30);
          tmpLoginLog.pop();
          tmpLoginFLog.pop();
          tmpSignupLog.pop();
          tmpSignupFLog.pop();
          tmpVerifyLog.pop();
          tmpVeriftFLog.pop();
        } while (!isCancel);
      } catch (error) {
        toastService.error("An error occurred while loading log's data.");
      }
    };

    handleLoadChartDatas();

    return () => {
      isCancel = true;
    };
  }, [poolID]);

  return (
    <div className="monitoring-container-content">
      {(!isRoot && (!poolPolicies || !poolPolicies.canManage)) && (
        <div style={{ minHeight: "200px" }}>
          <h3 className="pd-20 mt-20 plc-alert">
            This account have no authority to manage this user pool data.
          </h3>
        </div>
      )}
      {(isRoot || (poolPolicies && !!poolPolicies.canManage)) && (
        <div className="chart-container">
          <Card
            title="Login Traffic"
            content={
              <TimeAreaChart data={loginLogs} xName="Time" yName="Call" />
            }
          />

          <Card
            title="Failed Login Call Rate"
            content={
              <TimeAreaChart data={loginFailLogs} xName="Time" yName="Call" />
            }
          />

          <Card
            title="Sign Up Traffic"
            content={
              <TimeAreaChart data={signupLogs} xName="Time" yName="Call" />
            }
          />

          <Card
            title="Sign Up Fail Traffic"
            content={
              <TimeAreaChart data={signupFailLogs} xName="Time" yName="Call" />
            }
          />

          <Card
            title="Token Call Rate"
            content={
              <TimeAreaChart data={verifyLogs} xName="Time" yName="Call" />
            }
          />

          <Card
            title="Invalid Token Call Rate"
            content={
              <TimeAreaChart data={verifyFailLogs} xName="Time" yName="Call" />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Monitoring;
