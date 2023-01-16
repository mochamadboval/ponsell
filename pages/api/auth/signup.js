import { hash } from "bcryptjs";

const firebaseURL =
  "https://ponsell-default-rtdb.asia-southeast1.firebasedatabase.app";

function checkInvalidInput(email, name, password) {
  if (!name.trim()) {
    return "Invalid name. Name cannot be blank!";
  }
  if (!email || !email.includes("@")) {
    return "Invalid email. Email should contain @ symbol!";
  }
  if (!password || password.trim().length < 8) {
    return "Invalid password. Password must be at least 8 characters!";
  }
}

export async function isUserExists(email) {
  const response = await fetch(
    `${firebaseURL}/users.json?orderBy="email"&equalTo="${email}"`
  );
  const data = await response.json();

  return data;
}

async function createNewUser(email, name, password) {
  const response = await fetch(`${firebaseURL}/users.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: `${+new Date()}`, email, name, password }),
  });
  const data = await response.json();

  return data;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, password } = req.body;

    const invalid = checkInvalidInput(email, name, password);
    if (invalid) {
      res.status(422).json({ message: invalid });
      return;
    }

    const user = await isUserExists(email);
    if (Object.keys(user).length !== 0) {
      res.status(422).json({ message: "User already exists!" });
      return;
    }

    const hashedPassword = await hash(password, 12);
    const newUser = await createNewUser(email, name, hashedPassword);

    res.status(201).json({
      message: "Welcome. Please login to enter!",
      userId: newUser.name,
    });
  }
}
