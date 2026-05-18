const admin = require("firebase-admin");

const serviceAccount = require("./backend/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function deleteAllUsers(nextPageToken) {
  const result = await admin.auth().listUsers(1000, nextPageToken);

  const uids = result.users.map((user) => user.uid);

  if (uids.length > 0) {
    const deleted = await admin.auth().deleteUsers(uids);
    console.log(`${deleted.successCount} usuários removidos`);
  }

  if (result.pageToken) {
    await deleteAllUsers(result.pageToken);
  }
}

deleteAllUsers()
  .then(() => {
    console.log("Todos os usuários foram removidos do Firebase Auth.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Erro ao remover usuários:", error);
    process.exit(1);
  });