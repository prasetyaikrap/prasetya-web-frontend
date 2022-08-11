export default async function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const revalidatePath = req.body.revalidatePath;
  try {
    await res.revalidate(revalidatePath);
    return res.status(200).json({
      revalidatePath: revalidatePath,
      revalidated: true,
      message: "Revalidated Successfullty",
    });
  } catch (err) {
    return res.status(500).send({
      revalidatePath: revalidatePath,
      revalidated: false,
      message: "Revalidated Error",
    });
  }
}
