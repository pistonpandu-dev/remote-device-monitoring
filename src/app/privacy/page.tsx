'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We collect information that you provide directly to us, such as when you create an account,
              update your profile, or use our services. This may include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
              <li>Name and email address</li>
              <li>Device information and usage data</li>
              <li>Location data (with your consent)</li>
              <li>Communication preferences</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We use the information we collect to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We retain your personal information for as long as necessary to fulfill the purposes
              outlined in this privacy policy, unless a longer retention period is required or permitted by law.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p className="mt-2 text-muted-foreground">
              Email: <a href="mailto:privacy@example.com" className="text-primary hover:underline">
                privacy@example.com
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
