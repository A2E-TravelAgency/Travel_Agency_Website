export async function getPrivateData (req, res, next) {
    console.log(req.user);
    res.status(200).json({
        success : true,
        data: "You have access to the private data on this route",
    });
};