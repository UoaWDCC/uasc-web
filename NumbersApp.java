import java.awt.*;
import javax.swing.*;
import java.awt.event.*;
import java.awt.FlowLayout;
import javax.swing.event.*;
import java.util.ArrayList;
import java.util.Arrays;

public class NumbersApp extends JFrame {
    private JTextField factorField;
    private JList<Integer> list;
    private JButton addButton;
    private Integer[] numbers = new Integer[]{Integer.valueOf(1), Integer.valueOf(2), Integer.valueOf(3), Integer.valueOf(4)};
    public NumbersApp() {
        factorField = new JTextField("3", 10);
        list = new JList<Integer>(numbers);
        addButton = new JButton("Add");
        JPanel commandpanel = new JPanel();
        commandpanel.add(list);
        commandpanel.add(factorField);
        commandpanel.add(addButton);
        getContentPane().add(commandpanel, BorderLayout.NORTH);
        addButton.addActionListener( new AddFactorListener() );
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(600, 200);
        setVisible(true);
    }
    //complete this
    // We create a AddFactorListener class that implements ActionListener
    class AddFactorListener implements ActionListener {
        // This actionPerformed method runs when the button clicks
        public void actionPerformed(ActionEvent e) {
            // jijiku use try n catch because if not an integer, we dont do anything
            try {
                // parse the text field as an integer
                int factor = Integer.parseInt(factorField.getText());
                // loop all numbers n try to add the factor
                for(int i = 0; i < numbers.length; i++){
                    numbers[i] += factor;
                }
                // update the java thingy
                list.updateUI();
            } catch (NumberFormatException ex) {
                // if not an integer, we set the text field to 3
            }
        }
    }

    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
        public void run() {new NumbersApp();}
        });
    }
}
