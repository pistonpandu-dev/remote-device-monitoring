'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              By using Remote Device Monitoring, you agree to these terms of service.
              If you do not agree, please do not use our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Remote Device Monitoring provides real-time monitoring and management of remote devices,
              including screen streaming, location tracking, and device management features.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You are responsible for maintaining the security of your account and password.
              You agree to provide accurate and complete information when creating your account.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. User Conduct</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
              <li>Use the service for any illegal purpose</li>
              <li>Interfere with or disrupt the service</li>
              <li>Attempt to gain unauthorized access to the service</li>
              <li>Use the service to harass or harm others</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The service and its original content, features, and functionality are owned by
              Remote Device Monitoring and are protected by international copyright, trademark,
              patent, trade secret, and other intellectual property laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may terminate or suspend your account immediately, without prior notice or liability,
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The service is provided "as is" and "as available" without any warranties of any kind,
              either express or implied, including but not limited to the implied warranties of
              merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              In no event shall Remote Device Monitoring be liable for any indirect, incidental,
              special, consequential, or punitive damages, including without limitation loss of
              profits, data, use, goodwill, or other intangible losses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to modify or replace these terms at any time.
              We will provide notice of any changes by posting the new terms on this page.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have any questions about these terms, please contact us at:
            </p>
            <p className="mt-2 text-muted-foreground">
              Email: <a href="mailto:legal@example.com" className="text-primary hover:underline">
                legal@example.com
              </a>
            </p>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground">
          Last updated: January 15, 2024
        </p>
      </div>
    </div>
  );
}
