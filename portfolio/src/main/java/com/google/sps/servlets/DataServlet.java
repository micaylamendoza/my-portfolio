// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import com.google.gson.Gson;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {    
    // Converts ArrayList to a JSON string using Gson.
    String json = convertToJsonUsingGson(comments);

    // Gives a PreparedQuery instance that contains all of the entities in Datastore with that kind
    Query query = new Query("Task").addSort("new comment", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    // Sends response as JSON.
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  private static String convertToJsonUsingGson(ArrayList<String> comments) {
    Gson gson = new Gson();
    String json = gson.toJson(comments);
    return json;
  }

@Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String newComment = getParameter(request, "text-input", "");

    // Add input to ArrayList.
    comments.add(newComment);

    // Creates an Entity with a kind of Task and stores it in taskEntity variable.
    Entity taskEntity = new Entity("Task");

    // Adds two properties to the taskEntity entity
    taskEntity.setProperty("new comment", newComment);

    // Creates an instance of the DatastoreService class.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    // Store entity by passing it into datastore.put()
    datastore.put(taskEntity);
   
    // Redirect to the index.html.
    response.sendRedirect("/contact.html");
  }

  /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String comments, String defaultValue) {
    String value = request.getParameter(comments);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}