export default function ContactPage() {
  return (
    <div className="px-6 sm:px-10 lg:px-20 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-4">
            Hubungi Kami
          </h1>
        </div>

        {/* Contact Sections */}
        <div className="space-y-8">
          {/* WhatsApp */}
          <div>
            <h2 className="text-lg font-bold mb-3">WhatsApp</h2>
            <p>
              <a
                href="https://wa.me/6285641641930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                +62 856-4164-1930
              </a>
            </p>
          </div>

          {/* Email */}
          <div>
            <h2 className="text-lg font-bold mb-3">Email</h2>
            <p>
              <a
                href="https://wa.me/6285641641930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hubungi via WhatsApp
              </a>
            </p>
          </div>

          {/* Instagram */}
          <div>
            <h2 className="text-lg font-bold mb-3">Instagram</h2>
            <p>
              <a
                href="https://wa.me/6285641641930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hubungi via WhatsApp
              </a>
            </p>
          </div>

          {/* Facebook */}
          <div>
            <h2 className="text-lg font-bold mb-3">Facebook</h2>
            <p>
              <a
                href="https://wa.me/6285641641930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hubungi via WhatsApp
              </a>
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h2 className="text-lg font-bold mb-3">Marketplace</h2>
            <p>
              <a
                href="https://wa.me/6285641641930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hubungi via WhatsApp untuk Pemesanan
              </a>
            </p>
          </div>

          {/* Workshop Location */}
          <div>
            <h2 className="text-lg font-bold mb-3">Kunjungi Workshop Kami</h2>
            <p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Wawar+Lor+RT+2+RW+4+Desa+Bedono+Kecamatan+Jambu+Kabupaten+Semarang+Jawa+Tengah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Patchtern Workshop
              </a>
              <br />
              <span className="text-gray-700">
                Wawar Lor, RT 2 RW 4, Desa Bedono, Kecamatan Jambu, Kabupaten Semarang, Jawa Tengah
              </span>
            </p>
          </div>

          {/* Map */}
          <div className="pt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7677.860998446347!2d110.34616974086124!3d-7.303467228989759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWawar%20Lor%2C%20RT%202%20RW%204%2C%20Desa%20Bedono%2C%20Kecamatan%20Jambu%2C%20Kabupaten%20Semarang%2C%20Jawa%20Tengah!5e1!3m2!1sen!2sid!4v1764980665322!5m2!1sen!2sid"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
