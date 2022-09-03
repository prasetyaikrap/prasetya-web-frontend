import DashboardAdmin from "pages/adminpage/Dashboard";
import ad from "data/metadata.json";

export async function getStaticProps() {
  const { info, adminpage } = ad.languages.en;
  return {
    props: {
      adminMetadata: { info, adminpage },
    },
  };
}

export default function AdminDashboard({ adminMetadata }) {
  return <DashboardAdmin adminMetadata={adminMetadata} />;
}

AdminDashboard.displayName = "AdminDashboard";
