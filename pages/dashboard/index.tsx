import Head from "next/head";
import tw from "twin.macro";
import styled from "styled-components";
import Link from "next/link";
import React from "react";
import { PageContainer } from "../../components/common";
import dynamic from "next/dynamic";

const DashboardIndexContent = dynamic(
  () => import("../../components/dashboard/IndexContent"),
  { ssr: false }
);

const DashboardContainer = styled.div`
  ${tw`flex flex-col flex-1`}
`;

export default function Dashboard() {
  return (
    <DashboardContainer>
      <PageContainer>
        <DashboardIndexContent />
      </PageContainer>
    </DashboardContainer>
  );
}
