import { createClient } from "@libsql/client";

export const db = createClient({
  url: `libsql://easylyfcard-paskkal.turso.io`,
  authToken: `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzIyMDQ4NTksImlkIjoiY2E2MzE1Y2EtNWFhNC00MGRiLTgyZjEtNWE0NzAzOGM2NWM2In0.F_864pKz0bwwGWQTr6qnsftZUEz_52_M2EqiSSNtmR2591_wKrwn4wFuq-eVrqHUNJ6ClTMr0LVgXklx3e2GAQ`,
});
