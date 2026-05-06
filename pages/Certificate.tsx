import { useParams } from "react-router-dom";
import { Heart, Award, Calendar, User, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CertificateData {
  id: string;
  userName: string;
  userEmail: string;
  moduleTitle: string;
  completionDate: string;
  score: number;
  xpEarned: number;
}

export default function Certificate() {
  const { id } = useParams<{ id: string }>();

  // In a real app, this would fetch from a database
  const certificates = JSON.parse(localStorage.getItem("aidquest_certificates") || "[]");
  const certificate = certificates.find((cert: CertificateData) => cert.id === id);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold mb-2">Certificate Not Found</h2>
            <p className="text-muted-foreground">
              The certificate you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Certificate */}
        <Card className="relative overflow-hidden border-2" style={{ borderColor: "hsl(var(--color-primary-500))" }}>
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />

          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center border-b" style={{ borderColor: "hsl(var(--color-primary-500))" }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--color-primary-500))" }}
              >
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-foreground">
                AidQuest
              </h1>
            </div>
            <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-foreground mb-2">
              Certificate of Completion
            </h2>
            <p className="text-muted-foreground">
              Emergency Response Training Certification
            </p>
          </div>

          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl uppercase tracking-wide mb-2">
                {certificate.userName}
              </h3>
              <p className="text-muted-foreground mb-4">{certificate.userEmail}</p>
              <p className="text-lg">
                Has successfully completed the training module:
              </p>
              <h4 className="font-display font-bold text-lg uppercase tracking-wide mt-2 mb-4">
                {certificate.moduleTitle}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Completion Date</span>
                </div>
                <p className="text-muted-foreground">
                  {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Score</span>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {certificate.score}%
                </Badge>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-semibold">XP Earned</span>
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {certificate.xpEarned} XP
                </Badge>
              </div>
            </div>

            <div className="text-center border-t pt-6" style={{ borderColor: "hsl(var(--color-primary-500))" }}>
              <p className="text-sm text-muted-foreground mb-2">
                This certificate is issued by AidQuest Training Platform
              </p>
              <p className="text-xs text-muted-foreground">
                Certificate ID: {certificate.id}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Print Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Present this certificate to Red Cross for assessment validation
          </p>
          <button
            onClick={() => window.print()}
            className="btn-chamfer px-6 py-2 text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:-translate-y-0.5"
            style={{
              background: "hsl(var(--color-primary-500))",
              boxShadow: "0 0 12px rgba(230,57,70,0.3)",
            }}
          >
            Print Certificate
          </button>
        </div>
      </div>
    </div>
  );
}