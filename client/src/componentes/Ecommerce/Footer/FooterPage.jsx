import React from "react";

function FooterPage() {
  return (
    <>
      <footer className="w-full py-8 bg-tertiary text-white">
        <div className="container mx-auto px-6 flex justify-center items-center flex-col">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4">
              <h5 className="uppercase mb-6 font-bold">Nina</h5>
              <p className="mb-4">
                Tu tienda de confianza para todas tus necesidades.
              </p>
            </div>
            <div className="w-full md:w-1/4">
              <h5 className="uppercase mb-6 font-bold">Enlaces</h5>
              <ul className="mx-3 mb-4">
                <li>
                  <a href="#" className="hover:underline">
                    Inicio
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:underline">
                    Sobre nosotros
                  </a>
                </li>

                <li>
                  <a href="+54 9 2614 16-1558" className="hover:underline">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h5 className="uppercase mb-6 font-bold">Contacto</h5>
              <ul className="mx-3 mb-4">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:ryc.general@gmail.com"
                    className="hover:underline"
                  >
                    ryc.general@gmail.com
                  </a>
                </li>
                <li>
                  Teléfono:{" "}
                  <a
                    href="https://wa.me/2614161558"
                    className="hover:underline"
                  >
                    +54 9 2614 16-1558
                  </a>
                </li>
                <li>Dirección: Av. Bartolomé Mitre 734, M5500 Mendoza</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h5 className="uppercase mb-6 font-bold">Siguenos</h5>
              <ul className="flex justify-center mb-4">
                <li className="mx-3">
                  <a href="#">
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/124/124010.png"
                      className="bg-white"
                      alt="Facebook"
                      style={{ width: "32px", height: "32px" }}
                    />
                  </a>
                </li>
                <li className="mx-3">
                  <a href="#">
                    <img
                      src="https://i.blogs.es/b4eb3e/x-linda/450_1000.jpeg"
                      alt="X"
                      style={{ width: "32px", height: "32px" }}
                    />
                  </a>
                </li>
                <li className="mx-3">
                  <a href="https://instagram.com/ninamendoza.ok">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png"
                      alt="Instagram"
                      style={{ width: "32px", height: "32px" }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="mt-8">
          <h5 className="uppercase mb-6 font-bold text-center">
            Formas de Pago
          </h5>
          <div className="flex justify-center mb-8 flex-wrap gap-2">
            <img
              src="https://via.placeholder.com/64"
              alt="Visa"
              className="mx-2"
            />
            <img
              src="https://via.placeholder.com/64"
              alt="MasterCard"
              className="mx-2"
            />
            <img
              src="https://via.placeholder.com/64"
              alt="PayPal"
              className="mx-2"
            />
            <img
              src="https://via.placeholder.com/64"
              alt="Amex"
              className="mx-2"
            />
            <img
              src="https://via.placeholder.com/64"
              alt="MercadoPago"
              className="mx-2"
            />
          </div>
        </div> */}
        </div>
         
      </footer>
      
       
<div className="flex bg-black justify-center md:justify-end w-full p-4 text-orange-700 text-sm">
  <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
    <h5 className="uppercase">
      Creado{" "}
      <a
        className="text-white"
        href="https://wa.me/qr/SKAVVYZHLGJEB1"
        target="_blank"
        rel="noopener noreferrer"
      >
        por Nahuel
      </a>{" "}
      <a
        className="text-orange-700 animate-pulse"
        href="https://wa.me/qr/SKAVVYZHLGJEB1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Argañaraz
      </a>
    </h5>

    <a
      href="https://wa.me/qr/SKAVVYZHLGJEB1"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-white bg-orange-700 hover:bg-orange-600 transition duration-300 shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 fill-white"
        viewBox="0 0 32 32"
      >
        <path d="M16 2.933c-7.242 0-13.067 5.825-13.067 13.067 0 2.304.602 4.574 1.75 6.566L2 30l7.64-2.19c1.928 1.038 4.108 1.583 6.36 1.583 7.242 0 13.067-5.825 13.067-13.067S23.242 2.933 16 2.933zm0 23.467c-1.964 0-3.883-.512-5.583-1.484l-.4-.233-4.533 1.3 1.317-4.417-.267-.45C5.575 19.633 5 17.842 5 16c0-6.067 4.933-11 11-11s11 4.933 11 11-4.933 11-11 11zm6.017-8.008c-.333-.167-1.95-.95-2.25-1.058-.3-.1-.517-.167-.733.167s-.85 1.058-1.042 1.275c-.192.217-.383.25-.717.083-.333-.167-1.408-.517-2.683-1.65-.992-.883-1.658-1.975-1.85-2.308-.192-.333-.021-.512.146-.679.15-.15.333-.383.5-.575.167-.192.217-.333.333-.558.108-.217.05-.408-.025-.575-.075-.167-.733-1.767-1.008-2.417-.267-.642-.542-.558-.733-.567l-.625-.008c-.208 0-.55.075-.833.358-.283.283-1.1 1.075-1.1 2.625s1.125 3.042 1.283 3.25c.158.208 2.217 3.392 5.367 4.758.75.325 1.333.517 1.792.658.75.242 1.433.208 1.975.125.6-.092 1.95-.8 2.225-1.575.275-.767.275-1.425.192-1.558-.084-.133-.308-.217-.642-.383z" />
      </svg>
      Contacto
    </a>
  </div>
</div>

 </>
   
  );

}

export default FooterPage;
