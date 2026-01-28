import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/bank")
public class BankServlet extends HttpServlet {

    // Sample balance (Normally from Database)
    private static int balance = 5000;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        String action = request.getParameter("action");

        // ---------------- LOGIN ----------------
        if ("login".equals(action)) {
            String username = request.getParameter("username");
            String password = request.getParameter("password");

            if (username.equals("admin") && password.equals("admin123")) {
                out.print("Login Successful");
            } else {
                out.print("Invalid Credentials");
            }
        }

        // ---------------- DEPOSIT ----------------
        else if ("deposit".equals(action)) {
            int amount = Integer.parseInt(request.getParameter("amount"));

            if (amount <= 0) {
                out.print("Invalid deposit amount");
            } else {
                balance += amount;
                out.print("Deposit Successful. Balance: " + balance);
            }
        }

        // ---------------- WITHDRAW ----------------
        else if ("withdraw".equals(action)) {
            int amount = Integer.parseInt(request.getParameter("amount"));

            if (amount > balance) {
                out.print("Insufficient Balance");
            } else {
                balance -= amount;
                out.print("Withdraw Successful. Balance: " + balance);
            }
        }

        // ---------------- TRANSFER ----------------
        else if ("transfer".equals(action)) {
            int amount = Integer.parseInt(request.getParameter("amount"));

            if (amount > balance) {
                out.print("Transfer Failed: Insufficient Balance");
            } else {
                balance -= amount;
                out.print("Transfer Successful. Balance: " + balance);
            }
        }
    }
}
