import { useUser } from '../features/authentication/useUser';

function Footer() {
  const { user } = useUser();

  const currentYear = new Date().getFullYear();

  const startYear = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).getFullYear()
    : currentYear;

  return (
    <footer className="px-2 py-2 md:py-4 text-sm md:text-base text-center bg-stone-300 dark:bg-gray-900">
      <p>
        Copyright &copy; {startYear} - {currentYear} Mahmoud Mostafa
      </p>
    </footer>
  );
}

export default Footer;
