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
          {/* Email */}
          <div>
            <h2 className="text-lg font-bold mb-3">Email</h2>
            <p>
              <a
                href="mailto:hello@patchtern.com"
                className="text-primary hover:underline"
              >
                hello@patchtern.com
              </a>{" "}
              (umum)
            </p>
          </div>

          {/* WhatsApp */}
          <div>
            <h2 className="text-lg font-bold mb-3">WhatsApp Business</h2>
            <p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                +62 812-3456-7890
              </a>{" "}
              (Customer Care)
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              Belanja 24/7 di Marketplace Kami
            </h2>
            <p>
              <a
                href="https://www.tokopedia.com/patchtern"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                tokopedia.com/patchtern
              </a>
              <br />
              <a
                href="https://shopee.co.id/patchtern"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                shopee.co.id/patchtern
              </a>
            </p>
          </div>

          {/* Instagram */}
          <div>
            <h2 className="text-lg font-bold mb-3">Instagram</h2>
            <p>
              <a
                href="https://www.instagram.com/patchtern"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @patchtern
              </a>
            </p>
          </div>

          {/* Facebook */}
          <div>
            <h2 className="text-lg font-bold mb-3">Facebook</h2>
            <p>
              <a
                href="https://www.facebook.com/patchtern"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Patchtern
              </a>
            </p>
          </div>

          {/* Workshop Location */}
          <div>
            <h2 className="text-lg font-bold mb-3">Kunjungi Workshop Kami</h2>
            <p>
              <a
                href="https://maps.app.goo.gl/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Patchtern Workshop
              </a>
              <br />
              <a
                href="https://maps.app.goo.gl/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Jl. Contoh No. 123, Jakarta Selatan, 12345 DKI Jakarta
              </a>
            </p>
          </div>

          {/* Map */}
          <div className="pt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1751171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMzAuNCJTIDEwNsKwNDknMTAuNCJF!5e0!3m2!1sen!2sid!4v1234567890!5m2!1sen!2sid"
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
