            <label for="rig">Rig:</label>
            <select id="rig" name="rig">
                <% for (let rig of rigs) { %>
                <option value="<%= rig._id %>"><%= rig.name %></option>
                <% } %>
            </select>

            .then(jump => {
            res.render('jump-details', {
                jump: jump
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))