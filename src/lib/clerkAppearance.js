import { dark } from "@clerk/themes";

export const authFormAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#ccff00",
    colorBackground: "#161a1f",
    colorInputBackground: "rgba(255, 255, 255, 0.05)",
    colorInputText: "#ededed",
    colorText: "#ededed",
    colorTextSecondary: "rgba(255, 255, 255, 0.45)",
    colorNeutral: "#ededed",
    borderRadius: "0.75rem",
    spacingUnit: "1rem",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  layout: {
    socialButtonsPlacement: "top",
    socialButtonsVariant: "blockButton",
    shimmer: false,
  },
  elements: {


    // Modal — center on screen
    modalBackdrop: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      margin: "auto",
    },

    // Card utama — dark solid seperti referensi tapi dark
    rootBox: "w-full mx-auto",
    cardBox: "w-full shadow-2xl",
    card: {
      background: "#161a1f",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 0 0 1px rgba(204,255,0,0.04), 0 24px 48px rgba(0,0,0,0.5)",
      borderRadius: "1.25rem",
      padding: "2rem",
      gap: "1.25rem",
      width: "100%",
    },

    // Header tetap tampil (biarkan Clerk yang render)
    header: {
      marginBottom: "0.5rem",
    },
    headerTitle: {
      color: "#ededed",
      fontSize: "1.375rem",
      fontWeight: "700",
    },
    headerSubtitle: {
      color: "rgba(255,255,255,0.4)",
      fontSize: "0.875rem",
    },

    // Footer Clerk (Secured by Clerk)
    footer: {
      background: "transparent",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      paddingTop: "1rem",
    },
    footerActionLink: {
      color: "#ccff00",
      fontWeight: "600",
    },

    // Logo area
    logoBox: {
      marginBottom: "0.25rem",
    },

    main: { gap: "1rem" },
    socialButtons: { gap: "0.625rem" },
    form: { gap: "1rem" },
    formFieldRow: { gap: "0.5rem" },

    identityPreview: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "0.75rem",
    },
    alert: {
      borderRadius: "0.75rem",
      backgroundColor: "rgba(255,60,60,0.1)",
      border: "1px solid rgba(255,60,60,0.2)",
    },
    dividerLine: {
      background: "rgba(255, 255, 255, 0.08)",
    },
    dividerText: {
      color: "rgba(255, 255, 255, 0.3)",
      fontSize: "0.75rem",
    },
  },
};
