const jwt = require('jsonwebtoken');

const verifyAuth = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({ message: "Access token is missing" });
        }

        jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                // 액세스 토큰이 만료된 경우 리프레시 토큰 확인
                const refreshToken = req.cookies.refreshToken;

                if (!refreshToken) {
                    return res.status(401).json({ message: "Refresh token is missing" });
                }

                jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decodedRefreshToken) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(401).json({ message: "Refresh token not validated" });
                    }

                    // 리프레시 토큰이 유효한 경우, 새로운 액세스 토큰 발급
                    const newAccessToken = jwt.sign(
                        {
                            email: decodedRefreshToken.email,
                            isPro: decodedRefreshToken.isPro
                        },
                        process.env.ACCESS_SECRET,
                        {
                            expiresIn: '10m',
                            issuer: 'Pmatch',
                        }
                    );

                    // 새로운 액세스 토큰을 쿠키에 저장
                    res.cookie("accessToken", newAccessToken, {
                        secure: false,
                        httpOnly: true,
                    });
                    console.log("New accessToken was created with refreshToken")

                    // 클라이언트에 새로운 액세스 토큰 반환
                    return res.json({ accessToken: newAccessToken, decodedToken: decodedToken });
                });
            } else {
                // 액세스 토큰이 유효한 경우, 클라이언트에 현재 액세스 토큰 반환
                return res.json({ accessToken, decodedToken: decodedToken });
            }
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { verifyAuth };