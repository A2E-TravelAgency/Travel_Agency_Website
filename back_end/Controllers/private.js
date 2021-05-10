export async function getPrivateData (req, res, next) {
    res.status(200).json({
        success : true,
        data: "You have access to the private data on this route",
    });
};