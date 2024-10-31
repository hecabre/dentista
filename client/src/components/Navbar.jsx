import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { isAuthenticated, role, logout } = useAuth();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {role === "recepcionista" ? (
          <div className="flex items-center justify-center">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link className="flex items-center font-poppins-regular">
                Citas
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link className="flex items-center font-poppins-regular">
                Pacientes
              </Link>
            </Typography>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link
                className="flex items-center font-poppins-regular"
                to={"/doctor"}
              >
                Pacientes
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link
                className="flex items-center font-poppins-regular"
                to={"/procedimiento-cita"}
              >
                Procedimientos
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link
                className="flex items-center font-poppins-regular"
                to={"/tratamientos"}
              >
                Reportes
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <Link
                className="flex items-center font-poppins-regular"
                to={"/suministros"}
              >
                Suministros
              </Link>
            </Typography>
          </div>
        )}
      </ul>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-1 lg:px-8 lg:py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to={"/"}>
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium font-poppins-regular text-sapphire-600 flex items-center justify-center gap-4">
            <FaUserDoctor className="text-sapphire-600 text-xl" /> Dentista
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:flex lg:items-center lg:justify-center lg:gap-3 ">
            {isAuthenticated ? (
              <>
                {navList}
                <div className="flex items-center gap-x-1">
                  <Button
                    size="sm"
                    onClick={() => logout()}
                    className="hidden lg:inline-block font-poppins-regular bg-sapphire-600 font-semibold"
                  >
                    <span>Cerrar Sesion</span>
                  </Button>
                </div>
              </>
            ) : (
              <Link to={"/"}>
                <Button
                  size="sm"
                  className="hidden lg:inline-block font-poppins-regular bg-sapphire-600 font-semibold"
                >
                  <span>Iniciar sesion</span>
                </Button>
              </Link>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        <div className="flex items-center gap-x-1">
          {isAuthenticated ? (
            <>
              {navList}{" "}
              <Button
                size="sm"
                fullWidth
                className="lg:inline-block font-poppins-regular bg-sapphire-600 font-semibold"
              >
                <span>Cerrar Sesion</span>
              </Button>
            </>
          ) : (
            <Link to={"/"} className="w-full">
              <Button
                fullWidth
                size="sm"
                className="lg:inline-block font-poppins-regular bg-sapphire-600 font-semibold"
              >
                <span>Iniciar sesion</span>
              </Button>
            </Link>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
}
