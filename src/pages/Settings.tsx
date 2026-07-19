import { useUser } from '../features/authentication/useUser';
import AccountLongevity from '../features/settings/AccountLongevity';
import ChangePassword from '../features/settings/ChangePassword';
import DangerZone from '../features/settings/DangerZone';
import TeamMembers from '../features/settings/TeamMembers';
import PageHeader from '../ui/PageHeader';

export default function Settings() {
  const { user } = useUser();

  return (
    <>
      <PageHeader
        title="Account Settings"
        description="Manage your personal preferences, security settings, and team
          collaboration."
      />

      {/*  */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 py-6 md:py-8 px-0 md:px-6">
        <div className="space-y-6">
          <ChangePassword user={user!} />

          <TeamMembers />
        </div>

        <div className="space-y-6">
          <DangerZone user={user!} />

          <AccountLongevity user={user!} />
        </div>
      </div>
    </>
  );
}
