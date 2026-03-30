import * as bcrypt from "bcryptjs";

async function test() {
  try {
    const hash = await bcrypt.hash("admin123", 10);
    console.log("Hash generated:", hash);
    const valid = await bcrypt.compare("admin123", hash);
    console.log("Comparison works:", valid);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
